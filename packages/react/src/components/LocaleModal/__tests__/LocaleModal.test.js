/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import LocaleModal from '../LocaleModal';
import mockLocaleData from '../__data__/locale-data.json';
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

// const { prefix } = settings;

jest.mock('@carbon/ibmdotcom-services', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    getList: jest.fn(() => Promise.resolve(mockLocaleData)),
    getLangDisplay: jest.fn(() => Promise.resolve('United States - English')),
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
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('modal close should set isOpen to close', () => {
    const _localeModal = mount(<LocaleModal isOpen={false} />);

    expect(_localeModal.props().isOpen).toBe(false);
  });

  it('open prop should be true if isOpen is set to {true}', () => {
    const _localeModal = mount(<LocaleModal isOpen={true} />);

    expect(_localeModal.props().isOpen).toBe(true);
  });

  it('modal renders correctly', () => {
    act(() => {
      ReactDOM.render(
        <LocaleModal
          isOpen={true}
          localeData={mockLocaleData}
          localeDisplay={'Test - Test'}
        />,
        container
      );
    });

    const _link = container.querySelectorAll('.bx--card--link');

    //expect(_localeModal.props().isOpen).toBe(true);
  });
});
