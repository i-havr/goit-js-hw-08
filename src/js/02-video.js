import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const currentStorageData = localStorage.getItem(STORAGE_KEY);

setTimeAfterPageRefresh();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(currentTime) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTime.seconds));
}

function setTimeAfterPageRefresh() {
  if (currentStorageData) {
    player.setCurrentTime(currentStorageData);
  }
}
