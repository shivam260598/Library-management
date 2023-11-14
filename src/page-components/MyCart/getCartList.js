const getCartList = ({ bookList, authorNames, cart }) => {
    const finalList = [];
    (cart || []).forEach((element) => {
        const { book_id } = element || {};
        const book = (bookList || []).find((e) => e.id === book_id);
        const author = authorNames?.[book?.author_id] || '';
        finalList.push({
            ...book,
            author_name: author,
            cart_id: element?.id,
        });
    });

    return finalList;
};

export default getCartList;