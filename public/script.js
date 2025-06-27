document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('bg-grid');

    // 从我们的后端API获取图片列表
    fetch('/api/images')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(images => {
            // 遍历图片URL数组
            images.forEach(imageUrl => {
                // 创建一个新的img元素
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.className = 'grid-item';
                imgElement.loading = 'lazy'; // 懒加载图片

                // 将图片元素添加到网格容器中
                gridContainer.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying images:', error);
            // 可以在这里显示一个错误提示给用户
        });
});