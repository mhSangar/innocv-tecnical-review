import { Pipe, PipeTransform } from "@angular/core";

import { User } from "../models/user";

@Pipe({ name: "userListFilter" })
export class UserListFilterPipe implements PipeTransform {
  transform(list: User[], searchString: string): User[] {
    if (!list) return [];

    const filteredList = list.filter((user) => { 
      const nameLower = user.name.toLocaleLowerCase();
      const searchStringLower = searchString.toLocaleLowerCase();
      
      return nameLower.includes(searchStringLower);
    });

    // console.log({
    //   original: list,
    //   filtered: filteredList
    // })

    return filteredList;
  }
}
