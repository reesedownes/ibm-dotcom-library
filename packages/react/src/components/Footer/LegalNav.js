/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Link } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Placeholder <li/> element for injection of the TrustE cookie preferences link
 *
 * @returns {*} JSX object
 */
const renderTrusteItem = () => {
  return (
    <li
      className={`${prefix}--legal-nav__list-item`}
      data-autoid={`${stablePrefix}--privacy-cp`}
    />
  );
};

/**
 * Footer legal nav component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const LegalNav = ({ links }) => {
  if (!links || !links.length) {
    return null;
  }

  return (
    <aside
      data-autoid={`${stablePrefix}--footer-legal-nav`}
      className={`${prefix}--legal-nav__container`}>
      <nav className={`${prefix}--legal-nav`}>
        <ul className={`${prefix}--legal-nav__list`}>
          {renderListItems(links)}
          {renderTrusteItem()}
        </ul>
      </nav>
    </aside>
  );
};

/**
 * Loops through and renders list items for legal nav
 *
 * @param {Array} links A list of links to be rendered
 * @returns {object} JSX object
 */
function renderListItems(links) {
  return links.map(({ title, url }, index) => {
    if (!title || !url) {
      return null;
    }

    return (
      <li className={`${prefix}--legal-nav__list-item`} key={index}>
        <Link
          data-autoid={`${stablePrefix}--footer-legal-nav__link`}
          href={url}>
          {title}
        </Link>
      </li>
    );
  });
}

LegalNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

/**
 * @property defaultProps
 * @type {{groups: Array}}
 */
LegalNav.defaultProps = {
  links: null,
};

export default LegalNav;
