

export const data = [
    {
        id: 1,
        photo: 'https://s26162.pcdn.co/wp-content/uploads/2017/05/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Drama',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 2,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 3,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 4,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 5,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 6,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 7,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 8,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 9,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 10,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 11,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 12,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    }, {
        id: 13,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
    {
        id: 14,
        photo: '/the-lord-of-the-rings-book-cover.jpg',
        title: 'lordftherings',
        author: 'abraham lincolin',
        category: 'Action',
        rackNumber: '23',
        ISBN: '452-143-5687'
    },
];


export const findById = ({ params }) => {
    const key = JSON.parse(params.id);
    const oldData = data.find((item) => item.id === key)
    if (oldData) {
        return oldData;
    }
    return null
};