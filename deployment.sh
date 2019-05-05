echo "Deployment starting...";
ng build --prod --base-href /; cd dist/orchid-pos/;scp -r * root@139.59.192.33:/var/www/html
echo "Deployment complete.";
