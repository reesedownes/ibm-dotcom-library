/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import LocaleModalRegions from '../LocaleModalRegions';
import mockLocaleData from '../__data__/locale-data.json';
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

// const { prefix } = settings;

const sortList = list => {
  console.log(list);
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
}));

describe('<LocaleModalRegions />', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('modal renders correctly', () => {
    const _localeModalRegions = mount(
      <LocaleModalRegions
        regionList={sortList(mockLocaleData)}
        returnButtonLabel={'buttonLabel'}
      />
    );

    /*
    console.log('LocaleModalRegions: ', _localeModalRegions.html());
    console.log('LocaleModalRegions debug: ', _localeModalRegions.debug());
    */

    expect(_localeModalRegions.find('.bx--locale-modal__regions')).toHaveLength(
      1
    );
  });

  it('clicking region does callback', () => {
    act(() => {
      ReactDOM.render(
        <LocaleModalRegions
          regionList={sortList(mockLocaleData)}
          returnButtonLabel={'buttonLabel'}
        />,
        container
      );
    });

    const _link = container.querySelectorAll('.bx--card--link');
    console.log('_link length:', _link.length);
    console.log('_link innerHtml:', _link[0]);

    //expect(LocaleModalRegions.setCurrentRegion).toHaveBeenCalled();
  });
});
