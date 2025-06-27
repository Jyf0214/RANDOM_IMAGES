// functions/api/random.js

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'vertical'; // 默认为竖屏

    const key = type === 'horizontal' ? 'horizontal_images' : 'vertical_images';

    try {
        const imageListJson = await env.IMAGE_KV.get(key);
        if (!imageListJson) {
            return new Response(`Category "${type}" not found in KV.`, { status: 404 });
        }

        const imageList = JSON.parse(imageListJson);
        if (imageList.length === 0) {
            return new Response(`Category "${type}" is empty.`, { status: 404 });
        }
        
        // 随机选择一个URL
        const randomUrl = imageList[Math.floor(Math.random() * imageList.length)];
        
        // 返回302重定向
        return Response.redirect(randomUrl, 302);

    } catch (e) {
        return new Response('Error redirecting: ' + e.message, { status: 500 });
    }
}