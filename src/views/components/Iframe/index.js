import React from 'react';
import PropTypes from 'prop-types';

export default function Iframe(props) {
  const { className, url } = props;

  return (
    <iframe className={"border-0 w-100 " + className} title="iframe-web" src={url} 
      allowFullScreen={true} mozallowfullscreen="true" webkitallowfullscreen="true" referrerPolicy="unsafe-url"
      allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;"
      sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-downloads"
    ></iframe>
  );
}

Iframe.defaultProps = {
  className: '',
  url: null,
};

Iframe.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
};
