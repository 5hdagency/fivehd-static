CWD_HUGO=$(pwd)
cd themes/fivehd/src && npm install && npm run build:production
cd $CWD_HUGO && hugo
