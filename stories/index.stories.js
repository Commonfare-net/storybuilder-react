import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';
import StoryBuilder from '../src';
import StoryItem from '../src/StoryItem/StoryItem';
import TextStoryItem from '../src/StoryItem/TextStoryItem';
import ImageStoryItem from '../src/StoryItem/ImageStoryItem';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
//
// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('StoryItem', module)
  .add('default', () => <StoryItem icon="rocket" content="A default story item with some text" />)

storiesOf('TextStoryItem', module)
  .add('default', () => <TextStoryItem content="This is my text" />)

storiesOf('ImageStoryItem', module)
  .add('default', () => <ImageStoryItem content="http://placekitten.com/g/200/300" />)

storiesOf('StoryBuilder', module)
  .add('default', () => <StoryBuilder />);
