# RTB, ReadThenBurn CopyCat

## Done
* Create node.js app
* Encryption
* Working app
* Fixed responsive design for Index (iPhone, iPad, 1200px> )
* Fix responsive design for landing page
* Fix responsive design for message page
* Fix responsive design for no message page
* URL QR-Code generation
* Add input validation with express-validate
* Validate origin on POST

## Todo
* Add "Share" option for iOS (burn link)

## Run
SECRET_KEY=`uuidgen|tr -d '-'` node app.js


docker run -d --rm -p 80:8080 -e SECRET_KEY=`uuidgen|tr -d '-'` flowerapi