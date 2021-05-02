import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async createPost(dto: CreatePostDto, image: any) {
    const file = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: file });
    return post;
  }
}
