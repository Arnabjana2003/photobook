import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(
    title,
    slug,
    content,
    featuredImage,
    status = "active",
    userId,
    username
  ) {
    try {
      return await this.databases.createDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        slug,
        { title, content, featuredImage, status, userId, username }
      );
    } catch (error) {
      console.log("DATABASE CREATE POST error", error);
    }
  }

  async updatePost(slug, title, content) {
    try {
      return await this.databases.updateDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        slug,
        { title, content }
      );
    } catch (error) {
      console.log("DATABASE UPDATE error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        slug
      );
      return true;
    } catch (error) {
      console.log("DATABASE DELETE  error", error);
      return false;
    }
  }

  async getPost(
    collectionId = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    slug
  ) {
    try {
      return this.databases.getDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        collectionId,
        slug
      );
    } catch (error) {
      console.log("DATABASE GETPOST  error", error);
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        queries
      );
    } catch (error) {
      console.log("DATABASE GETALLPOSTS  error", error);
      return false;
    }
  }

  //FILE UPLOAD SERVICES

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("FILE UPLOAD ERROR", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
        fileId
      );
    } catch (error) {
      console.log("FILE DELETE ERROR", error);
      return false;
    }
  }

  previewFile(fileId, ...rest) {
    return this.bucket.getFilePreview(
      String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
      fileId,
      ...rest
    );
  }

  //USER_PIC
  async createPhoto(userId, profilePic, coverPic) {
    try {
      return await this.databases.createDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_USERPIC_COLLECTION_ID),
        userId,
        { profilePic, coverPic }
      );
    } catch (error) {
      console.log("DATABASE CREATE POST error", error);
    }
  }

  async updateProfilePhoto(userId, profilePic) {
    try {
      return await this.databases.updateDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_USERPIC_COLLECTION_ID),
        userId,
        { profilePic }
      );
    } catch (error) {
      console.log("DATABASE UPDATE error", error);
    }
  }
  async updateCoverPhoto(userId, coverPic) {
    try {
      return await this.databases.updateDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_USERPIC_COLLECTION_ID),
        userId,
        { coverPic }
      );
    } catch (error) {
      console.log("DATABASE UPDATE error", error);
    }
  }
  async getAllPhoto() {
    try {
      return await this.databases.listDocuments(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_USERPIC_COLLECTION_ID)
      );
    } catch (error) {
      console.log("DATABASE GETALLPOSTS  error", error);
      return false;
    }
  }
}

const services = new Services();

export default services;
