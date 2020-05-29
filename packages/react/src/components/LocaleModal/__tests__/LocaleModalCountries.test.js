/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import localeData from '../../../../../services/src/services/Locale/__tests__/data/response.json';
import LocaleModalCountries from '../LocaleModalCountries';
import React from 'react';
import root from 'window-or-global';
import { shallow } from 'enzyme';

// const { prefix } = settings;

const mockLocaleData = Object.assign({}, localeData);

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
    getList: jest.fn(() =>
      Promise.resolve({
        localeModal: {
          availabilityText:
            'This page is available in the following locations and languages',
          headerTitle: 'Select region',
          modalClose: 'Close modal',
          searchClearText: 'Clear search input',
          searchLabel: 'Search by location or language',
          searchPlaceholder: 'Search by location or language',
          unavailabilityText:
            'This page is unavailable in your preferred location or language',
        },
        regionList: mockLocaleData.regionList,
      })
    ),
    getLangDisplay: jest.fn(() => Promise.resolve('United States — English')),
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
}));

describe('<LocaleModalCountries />', () => {
  it('modal renders correctly', () => {
    const localeModalCountries = shallow(
      <LocaleModalCountries regionList={sortList(mockLocaleData.regionList)} />
    );

    expect(localeModalCountries.find('.bx--locale-modal__filter')).toHaveLength(
      1
    );
  });
});
