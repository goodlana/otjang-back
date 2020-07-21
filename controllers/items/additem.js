// {url}/item

module.exports = {
    post: (req, res) => {
        //req.body 구조분해할당으로 받아올 수 있나?
        const { image, category } = req.body;
        console.log(image, category) // 결과값: 각 키의 값들만 나옴.

        
    },
};