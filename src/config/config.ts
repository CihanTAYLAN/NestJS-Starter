export default () => ({
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || '',
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    db: process.env.DATABASE_DB,
    synchronize: process.env.DATABASE_SYNCHRONIZE || true,
  },
});
