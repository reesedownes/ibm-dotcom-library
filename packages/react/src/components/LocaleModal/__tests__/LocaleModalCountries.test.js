/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { shallow, mount } from 'enzyme';
import { ipcinfoCookie } from '@carbon/ibmdotcom-utilities';
import LocaleModalCountries from '../LocaleModalCountries';
import mockLocaleData from '../__data__/locale-data.json';
import React from 'react';
import root from 'window-or-global';

// const { prefix } = settings;

console.log('root', root.document);

const sortList = list => {
  const pageLangs = {
    'en-us': 'https://www.ibm.com/us-en/',
    'x-default': 'https://www.ibm.com',
  };

  const filterList = [];

  list.regionList &&
    list.regionList.map((region, index) => {
      filterList.push({
        name: region.name,
        key: region.key,
        countries: [],
      });

      for (let [key, value] of Object.entries(pageLangs)) {
        region.countryList.map(country => {
          country.locale.map(loc => {
            if (loc[0].includes(key)) {
              filterList[index].countries.push({
                region: region.key,
                name: country.name,
                locale: loc[0],
                language: loc[1],
                href: value,
              });
            }
          });
        });
      }

      filterList[index].countries.sort((a, b) => (a.name > b.name ? 1 : -1));
    });

  return filterList;
};

jest.mock('@carbon/ibmdotcom-services', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    getList: jest.fn(() => Promise.resolve(mockLocaleData)),
    getLangDisplay: jest.fn(() => Promise.resolve('United States - English')),
  },
}));

jest.mock('@carbon/ibmdotcom-utilities', () => ({
  altlangs: jest.fn(() =>
    Promise.resolve({
      'en-us': 'https://www.ibm.com/us-en/',
      'x-default': 'https://www.ibm.com',
    })
  ),
  settings: jest.fn(() =>
    Promise.resolve({
      version: 'dds.v1.0.0',
    })
  ),
  ipcinfoCookie: {
    get: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    set: jest.fn(() => Promise.resolve({})),
  },
  geolocation: jest.fn(() => Promise.resolve('us')),
}));

describe('<LocaleModalCountries />', () => {
  it('modal renders correctly', () => {
    const localeModalCountries = shallow(
      <LocaleModalCountries regionList={sortList(mockLocaleData)} />
    );

    expect(localeModalCountries.find('.bx--locale-modal__filter')).toHaveLength(
      1
    );
  });

  it('sets a cookie', () => {
    const _localeModalCountries = mount(
      <LocaleModalCountries regionList={sortList(mockLocaleData)} />
    );
    _localeModalCountries.find('.bx--locale-modal__locales').simulate('click');

    expect(ipcinfoCookie.set).toHaveBeenCalled();
  });
});
