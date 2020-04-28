/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { shallow, mount } from 'enzyme';
import LocaleModal from '../LocaleModal';
//import LocaleModalCountries from '../LocaleModalCountries';
//import LocaleModalRegions from '../LocaleModalRegions';
import React from 'react';

// const { prefix } = settings;

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
        regionList: [
          {
            name: 'Americas',
            key: 'am',
            countryList: [
              {
                locale: [['en-us', 'English']],
                name: 'United States',
              },
              {
                locale: [['en-ag', 'English']],
                name: 'Antigua and Barbuda',
              },
            ],
          },
        ],
      })
    ),
    getLangDisplay: jest.fn(() => Promise.resolve('United States — English')),
  },
}));

jest.mock('@carbon/ibmdotcom-utilities', () => ({
  altlangs: function() {
    return {
      'en-us': 'https://www.ibm.com/us-en/',
      'x-default': 'https://www.ibm.com',
    };
  },
  settings: {
    version: 'dds.v1.0.0',
  },
}));

describe('<LocaleModal />', () => {
  it('modal renders correctly', () => {
    const localeModal = shallow(<LocaleModal />);

    expect(localeModal.find('.bx--locale-modal')).toHaveLength(1);
  });

  it('modal close should set isOpen to close', () => {
    const localeModal = mount(<LocaleModal isOpen={false} />);
    /*
    const closeBtn = localeModal.find(
      `.bx--modal-close`
    );
    */

    console.log('closed modal: ', localeModal.html());

    expect(localeModal.props().isOpen).toBe(false);
  });

  it('open prop should be true if isOpen is set to {true}', () => {
    const localeModal = mount(<LocaleModal isOpen={true} />);

    expect(localeModal.props().isOpen).toBe(true);
  });

  // localemodal regions tests
  it('modal regions render correctly', () => {
    const localeModal = mount(<LocaleModal isOpen={true} />);

    console.log('locale modal: ', localeModal.html());

    localeModal.update();

    console.log('locale modal after update: ', localeModal.html());

    /*
    expect(
      localeModalRegions.html().indexOf("Americas")
    ).toBeTruthy();
    */
  });

  // force localemodalregions open for next test

  /*
  it('back button works', () => {
    const btnAutoId = `[data-autoid="${stablePrefix}--locale-modal__geo-btn-am"]`;
    const backBtn = '.bx--modal-header__label';
    const mockData = [
      {name: "Americas",
       key: "am",
       countries: [
        {
          region: "am",
          name: "Anguilla",
          locale: "en-ai",
          language: "English",
          href: "https://www.ibm.com/ai-en"
        }
       ]
    }];
    const localeModalRegions = shallow(<LocaleModalRegions regionList={mockData} />);
    console.log('before click: ', localeModalRegions.html());
    
    const amRegionBtn = localeModalRegions.find('a');


    console.log(localeModalRegions.find('a').debug());

    localeModalRegions.update();

    //console.log('button after: ', amRegionBtn.debug());
    

    console.log('after click: ', localeModalRegions.html());
  });
  */
});
