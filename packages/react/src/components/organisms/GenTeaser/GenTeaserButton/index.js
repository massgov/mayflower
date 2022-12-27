/**
 * GenTeaserButton module.
 * @module @massds/mayflower-react/GenTeaserButton
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";
import IconExpand from 'MayflowerReactBase/Icon/IconExpand';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';

/**
 * Expand Button
 */
const GenTeaserButton = (props) => {
  const { button, ...rest } = props;
  const icon = button.icon ? button.icon : <IconExpand width={15} height={15} />;
  return(
    <div className="ma__gen-teaser__button" {...rest}>
      <ButtonWithIcon
        capitalized
        {...button}
        icon={icon}
        size="small"
      />
    </div>
  );
};

GenTeaserButton.propTypes = {
  /** Expects props from ButtonWithIcon (e.g. text, info, etc.) */
  button: PropTypes.shape(ButtonWithIcon.propTypes).isRequired
};

export default GenTeaserButton;
