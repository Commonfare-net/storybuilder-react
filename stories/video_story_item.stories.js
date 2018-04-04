import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VideoStoryItem from '../src/StoryItem/VideoStoryItem';

storiesOf('VideoStoryItem')
  .add('empty', () => <VideoStoryItem onSave={() => action('item saved')}/>)
  .add('with a url', () => <VideoStoryItem url="https://www.youtube.com/watch?v=BKTc1OqG-6c" onSave={() => action('item saved')}/>)
