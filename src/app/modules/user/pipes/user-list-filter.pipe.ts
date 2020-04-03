import { Pipe, PipeTransform } from "@angular/core";

import { User } from "../models/user";

/**
 * Pipe to filter the list of users based on a search string on
 * the "name" property.
 */
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
