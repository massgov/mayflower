// @ts-nocheck
/**
 * Paragraph module.
 * @module @massds/mayflower-react/Paragraph
 */
import React from 'react';

export interface ParagraphProps {
  /** The text displayed. */
  text?: string
  /** A custom class. */
  className?: string
}

const Paragraph = (paragraph: ParagraphProps) => (
  /* eslint-disable-next-line react/no-danger */
  (<p className={paragraph.className} dangerouslySetInnerHTML={{ __html: paragraph.text || paragraph.children }} />)
);

export default Paragraph;
