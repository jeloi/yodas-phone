Yoda's Phone
===========

Text Yoda at +1 (646)-679-6262 and he texts you back with your message in "Yoda Speak".
[yoda.jeremyho.co](http://yoda.jeremyho.co/)

This little project was built to explore and make use of the Twilio API, as well as to learn and gain experience with Node.js/Express. 

## IYI
The "Yoda speak" conversion in this app is achieved using the API at [Mashape.com](https://www.mashape.com/ismaelc/yoda-speak). This is the largest bottleneck on Yoda's response time, as the API call is slow (good thing Node is non-blocking!). I wrote a [tiny node wrapper](https://github.com/Jeloi/node-yoda-speak). for the API, if you'd like to convert text to yoda speak with node.

On the project page, you can click to see recent texts Yoda has sent. This is achieved by making a call to Twilios message history endpoint and filtering the result. Therefore, no database is needed, which is pretty neat!

## Tips
Here are some [tips](https://www.mashape.com/ismaelc/yoda-speak/overview) for messaging Yoda.

## Author
Jeloi

## License
MIT
