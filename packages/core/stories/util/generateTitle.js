import { IconArrow } from '@massds/mayflower-react';
import LinkTo from '@storybook/addon-links/react';

import meta from '../meta.json';

export default (title) => `${meta.[title].kind}/${meta.[title].story}`;

export const StoryLink = ({ metaID, text, inline }) => (
  <LinkTo {...meta[metaID]} target='_blank'>{text || meta[metaID].story} {!inline && <IconArrow fill="#8AAAC7" height={11} width={11} />}</LinkTo>
)
