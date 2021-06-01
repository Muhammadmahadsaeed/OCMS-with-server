import {Platform} from 'react-native';
const RNFS = require('react-native-fs');

const dirHomePictures = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/OCMS`,
  android: `${RNFS.PicturesDirectoryPath}/OCMS`,
});

const AppFolder = 'OCMS';
const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
RNFS.mkdir(DirectoryPath);

//audio
const audioFolder = 'audio';
const AudioDirectoryPath = DirectoryPath + '/' + audioFolder;
RNFS.mkdir(AudioDirectoryPath);

const dirHomeAudio = Platform.select({
  ios: 'hello.m4a',
  android: AudioDirectoryPath,
});

//document
const docFolder = 'Documents';
const DocDirectoryPath = DirectoryPath + '/' + docFolder;
RNFS.mkdir(DocDirectoryPath);


export const dirPicutures = `${dirHomePictures}/Images`;
export const dirAudio = `${dirHomeAudio}`;
export const dirDocument = `${DocDirectoryPath}`;
