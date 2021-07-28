export default {
    "type": "postgres",
	"host": "db.qyctrtcwtwasdktftmuy.supabase.co",
	"port": 5432,
	"username": "postgres",
	"password": process.env.TYPEORM_PASSWORD,
	"database": "postgres",
	"synchronize": true,
	"logging": false,
	"entities": ["build/entity/*.js"],
	"migrations": [
		"src/migration/**/*.ts"
	],
	"subscribers": [
		"src/subscriber/**/*.ts"
	],
	"cli": {
		"entitiesDir": "src/entity",
		"migrationsDir": "src/migration",
		"subscribersDir": "src/subscriber"
	}
 }