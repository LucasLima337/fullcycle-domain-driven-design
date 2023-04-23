export default interface RepositoryInterface<Entity> {
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
  find(id: string): Promise<Entity>;
  findAll(): Promise<Entity[]>;
}
