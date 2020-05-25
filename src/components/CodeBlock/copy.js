import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../utils/index';
import { CopyButton } from './styles';

export default function Copy({ content }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      await copyToClipboard(content);
      setCopied(true);
    } catch (err) {
      setError(err);
    }

    setTimeout(() => {
      setCopied(false);
      setError(null);
    }, 700);
  };

  return (
    <CopyButton
      onClick={handleClick}
      disabled={copied}
      title="Copy the content"
    >
      {copied ? 'Copied' : error ? 'Error Copying' : 'Copy'}
    </CopyButton>
  );
}

Copy.propTypes = {
  content: PropTypes.string.isRequired
};
