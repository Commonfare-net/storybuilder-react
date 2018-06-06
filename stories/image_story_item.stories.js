// import React from 'react';
//
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
//
// import fakeUploader from './shared/fakeUploader';
// import ImageStoryItem from '../src/StoryItem/ImageStoryItem';
//
// storiesOf('ImageStoryItem')
//   .add('empty', () => (
//     <ImageStoryItem
//       imageUploadHandler={fakeUploader}
//       editItem={() => Promise.resolve()}
//       onSave={action('item saved')}
//       onRemove={action('item removed')}
//     />
//   ))
//   .add('default', () => (
//     <ImageStoryItem
//       content="http://placekitten.com/g/300/300"
//       imageUploadHandler={fakeUploader}
//       editItem={() => Promise.resolve()}
//       onSave={action('item saved')}
//       onRemove={action('item removed')}
//     />
//   ))
//   .add('with some caption', () => (
//     <ImageStoryItem
//       content="http://placekitten.com/g/300/300"
//       caption="A cute little cat, doing good helping the poor"
//       imageUploadHandler={fakeUploader}
//       editItem={() => Promise.resolve()}
//       onSave={action('item saved')}
//       onRemove={action('item removed')}
//     />
//   ))
//   .add('with custom remove behavior', () => (
//     <ImageStoryItem
//       content="http://placekitten.com/g/300/300"
//       imageUploadHandler={fakeUploader}
//       editItem={() => Promise.resolve()}
//       onSave={action('item saved')}
//       onRemove={(item) => alert(`You have removed me! I was ${item}`)}
//     />
//   ))
