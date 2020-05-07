/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card, cardPropTypes } from '../../sub-patterns/Card';
import classNames from 'classnames';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Featured Card Component
 *
 * @param {object} props props object
 * @param {string} props.heading section heading
 * @param {object} props.card section card object
 * @param {Function} props.onClick onClick function
 * @returns {*} FeatureCardBlockLarge JSX component
 */
const FeatureCardBlockLarge = ({ heading, card, onClick }) => {
  const hasCopy = classNames({
    [`${prefix}--feature-card-block-large_no-copy-text`]: !card.copy,
  });
  return (
    card.eyebrow &&
    card.heading &&
    card.cta && (
      <section
        className={`${prefix}--feature-card-block-large ${hasCopy}`}
        data-autoid={`${stablePrefix}--feature-card-block-large`}>
        <ContentGroup heading={heading}>
          <Card
            customClassName={`${prefix}--feature-card-block-large__card`}
            {...card}
            type="link"
            inverse={true}
            handleClick={onClick}
          />
        </ContentGroup>
      </section>
    )
  );
};

FeatureCardBlockLarge.propTypes = {
  heading: PropTypes.string.isRequired,
  card: PropTypes.oneOf(PropTypes.shape(cardPropTypes)).isRequired,
  onClick: PropTypes.func,
};

export default FeatureCardBlockLarge;
