import app from './hono-server';
import { serve } from '@hono/node-server'

serve({
    fetch: app.fetch,
    port: 3000,    
});