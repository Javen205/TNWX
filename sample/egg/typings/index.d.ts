import 'egg'

declare module 'egg' {
  interface mysql {
    get(tableName: String, find: {}): Promise<Any>
    query(sql: String, values: Any[]): Promise<Any>
    insert(sql: String, object: Object): Promise<Any>
    select(sql: String, object: Object): Promise<Any>
    delete(sql: String, object: Object): Promise<Any>
  }
  interface Application {
    mysql: mysql
  }
}
