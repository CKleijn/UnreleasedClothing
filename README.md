
![Logo](https://unreleasedclothing.netlify.app/assets/images/LogoUC.png)


# UnreleasedClothing
This application was made as part of the 'Clientside web frameworks' course of Avans Hogeschool Breda.

The purpose of this application is that brands can put their unreleased products online where they can ask questions about the opinion of major customers. They can combine the unreleased products with both existing and self-created categories. These custom categories can only edit or delete the brand if it was created by their brand. In addition, brands can only edit and delete the products of their own brand. The following customers can leave a comment on the product. They can add a rating to this response. These comments can only be edited and deleted if this comment is from the logged-in customer. Through multiple ages and calculated statistics, the brands can conclude whether they should release the product or not. In addition, similar customers can follow other accepted customers to get suggestions of future products you've featured. On the other hand, they can also follow customers if they no longer arouse their interests. Finally, the application gives suggestions to the customers regarding the similar products to which the customers' followers have also commented.

## Entities

#### User
- _id: ObjectId 
- name: string
- age: number
- emailAddress: string
- picture: string
- role: string
- following: User[]
- password: string
- createdAt: Date
#### Product
- _id: ObjectId 
- name: string
- picture: string
- price: number
- description: string
- category: Category
- comments: Comment[]
- createdBy: User
- createdAt: Date
#### Comment
- _id: ObjectId 
- title: string
- body: string
- rating: number
- createdBy: User
- createdAt: Date
#### Category
- _id: ObjectId 
- title: string
- description: string
- icon: Icon
- createdBy: User
- createdAt: Date
#### Icon
- _id: ObjectId 
- title: string
- icon: string

## Installation

Clone the project

```bash
  git clone https://github.com/CKleijn/UnreleasedClothing
```

Go to the project directory

```bash
  cd UnreleasedClothing
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  nx run uc-app:serve
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Authors

- [@CKleijn](https://www.github.com/CKleijn)

