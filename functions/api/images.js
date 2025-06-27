// functions/api/images.js

// Fisher-Yates Shuffle 算法，用于打乱数组
function shuffle(array) {
    // ... (代码在仓库中)
}

export async function onRequestGet({ env }) {
    try {
        // 从KV中获取两个分类的图片列表 (它们是JSON字符串)
        const verticalListJson = await env.IMAGE_KV.get("vertical_images");
        const horizontalListJson = await env.IMAGE_KV.get("horizontal_images");

        const verticalList = verticalListJson ? JSON.parse(verticalListJson) : [];
        const horizontalList = horizontalListJson ? JSON.parse(horizontalListJson) : [];

        // 合并并打乱所有图片
        const allImages = [...verticalList, ...horizontalList];
        shuffle(allImages);
        
        // 只返回前30张作为背景，避免数据量过大
        const responseImages = allImages.slice(0, 30);

        return new Response(JSON.stringify(responseImages), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (e) {
        return new Response('Error fetching images from KV: ' + e.message, { status: 500 });
    }
}