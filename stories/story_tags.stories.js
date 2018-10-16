import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StoryTags from '../src/StoryTags/StoryTags';

storiesOf('StoryTags')
  .add('empty', () => <StoryTags onSave={action('tags saved')} />)
  .add('pre-initialized', () => (
    <StoryTags
      tags={[{ id: 1, name: 'pregnancy'}, { id: 2, name: 'welfare provisions' }]}
      onChange={action('tags saved')}
    />
  ))
  .add('with autocomplete', () => (
    <StoryTags
      availableTags={[{ id: 1, name: 'pregnancy'}, { id: 2, name: 'welfare provisions' }]}
      onChange={action('tags saved')}
    />
  ))
