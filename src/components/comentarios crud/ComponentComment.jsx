export const getComments = async () => {
    return [
      {
        PostId: "1",
        Content: "First comment",
        username: "Jack",
        userId: "1",
        parentId: null,
        PublicationDate: "2021-08-16T23:00:33.010+02:00",
      },
     
    ];
  };
  
  export const createComment = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      Content: text,
      parentId,
      userId: "1",
      username: "John",
      PublicationDate: new Date().toISOString(),
    };
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };