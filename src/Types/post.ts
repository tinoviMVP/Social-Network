export interface PostItem {
    main_text: string;
    user_id: number;
    id: number;
    reg_date: string;
    user_fk: {
      name: string;
      user_city: string;
      id: number;
      password: string;
      email: string;
      phone_number: string;
      reg_date: string;
    };
    photos: [
      {
        photo_id: number;
        photo_url: string;
      }
    ];
    comments: [];
  }