/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { shallow, mount } from 'enzyme';
import localeData from '../../../../../services/src/services/Locale/__tests__/data/response.json';
import LocaleModal from '../LocaleModal';
import React from 'react';

// const { prefix } = settings;

const mockLocaleData = Object.assign({}, localeData);

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

    expect(localeModal.props().isOpen).toBe(false);
  });

  it('open prop should be true if isOpen is set to {true}', () => {
    const localeModal = mount(<LocaleModal isOpen={true} />);

    expect(localeModal.props().isOpen).toBe(true);
  });
});
