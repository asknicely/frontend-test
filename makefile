serve: ## Starts web server
	php -S localhost:1337 -t web/ web/index.php;

webpack: ## Starts webpack
	npx webpack;