var getRandomNumber = function() {
  var randomNumber = Math.floor(Math.random() * 25) + 1;
  return randomNumber;
}
console.log(getRandomNumber() + ' - this is random number from 1 to 25');

var pictureUrl = 'photos/' + getRandomNumber() + '.jpg';

console.log(pictureUrl + ' - and this is random picture url');

var getRandomLikes = function() {
  var randomLikes = Math.floor(Math.random() * 200) + 15;
  return randomLikes;
}

console.log(getRandomLikes() + ' - this is random quantity of likes');

var commentsArray = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

console.log(commentsArray);

var namesArray = ['Sania', 'Semion', 'Seriozha', 'Sara', 'Sofia', 'zapekanka'];

console.log(namesArray);

var randomName = namesArray[Math.floor(Math.random() * namesArray.length)];

var oneItemArray = {
  name: namesArray[Math.floor(Math.random() * namesArray.length)],
  avatar: pictureUrl,
  commment: commentsArray[Math.floor(Math.random() * commentsArray.length)]
};

console.log(oneItemArray);

var getRandomName = function() {
  var randomName = namesArray[Math.floor(Math.random() * namesArray.length)];
  return randomName;
}

var getRandomComment = function() {
  var randomComment = commentsArray[Math.floor(Math.random() * commentsArray.length)];
  return randomComment;
}

console.log(getRandomName());
console.log(getRandomComment());

var getRandomProfile = function() {

  var threeItemArray = {
    name: getRandomName(),
    avatar: pictureUrl,
    commment: getRandomComment()
  };

  return threeItemArray;
}


for (var i = 0; i <= 25; i++) {
  getRandomComment();
  console.log(getRandomProfile());
  console.log('zapusk 25 profilej')
};

var picturesBox = document.querySelector('.pictures');
