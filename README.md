Yoda's Phone
===========

Text Yoda at +1 (646)-679-6262 and he texts you back with your message in "Yoda Speak".

[yoda.jeremyho.co](http://yoda.jeremyho.co/)

I built this little project to explore Twilio's API and to learn and gain experience with Node.js/Express. Also.. to have some fun!

## IYI
The "Yoda Speak" conversion in this app is achieved using an API from [mashape.com](https://www.mashape.com/ismaelc/yoda-speak). This is the largest bottleneck on Yoda's response time, as the API call is slow (good thing Node is non-blocking!). I wrote a [tiny node wrapper](https://github.com/Jeloi/node-yoda-speak) for the API, if you'd like to convert your own text to yoda speak using Node.

On the project page, you can click to see recent texts Yoda has sent. This feature is implemented by making a call to Twilio's message history endpoint and filtering the result. No database is needed, which is pretty sweet!

## Tips
Here are some [tips](https://www.mashape.com/ismaelc/yoda-speak/overview) for messaging Yoda. The better the message you send him, the more yoda-like the response!

## Best Text Sent to Yoda
"Really happy for you, am I, and going to let you finish, I am, but the best phone line of all time, this is. Herh herh herh."

## Author
[Jeloi](jeremyho.co/about)

## License
MIT
