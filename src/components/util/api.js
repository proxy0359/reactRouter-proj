export const sendComment = async (data) => {
  try {
    const response = await fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          author: data.author,
          text: data.text,
        }),
      }
    );

    if (!response.ok) {
      throw new Error({ title: "Cannot send the quotes ", status: 405 });
    }
  } catch (err) {
    return err;
  }
};

export const getCommentData = async () => {
  try {
    const response = await fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json"
    );

    if (!response.ok) {
      throw new Error({ title: "Unable to get the data", status: 420 });
    }

    const convertData = await response.json();
    let data = [];
    console.log(convertData.id);

    for (let i in convertData) {
      data.unshift({
        id: convertData[i].id,
        author: convertData[i].author,
        text: convertData[i].text,
      });
    }

    console.log(data);

    return data;
  } catch (err) {
    return err;
  }
};

export const makeComment = async (data) => {
  try {
    const response = await fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/comment.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          id: data.id,

          comment: data.comment,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Can't send the comment");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getComment = async () => {
  try {
    const response = await fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/comment.json"
    );
    if (!response.ok) {
      throw new Error("Can't get the comment");
    }
    const data = await response.json();
    let comments = [];

    for (let i in data) {
      comments.unshift({
        id: data[i].id,
        name: data[i].name,
        comment: data[i].comment,
      });
    }

    return comments;
  } catch (err) {
    throw err;
  }
};
