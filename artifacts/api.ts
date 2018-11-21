/* tslint:disable */
import * as moment from 'moment';
import * as request from 'superagent';

export interface IRequestParams {
  method: string;
  url: string;
  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };
  body?: Object;
}

export abstract class ApiService {
  protected executeRequest<T>(params: IRequestParams) {
    return new Promise<T>((resolve, reject) => {
      let req = request(params.method, params.url)
        .set('Content-Type', 'application/json');

      const queryParameters = params.queryParameters;
      if (queryParameters) {
        Object.keys(queryParameters).forEach(key => {
          const value = queryParameters[key];
          if (Object.prototype.toString.call(value) === '[object Date]') {
            queryParameters[key] = moment(value as Date).format();
          }
        });

        req = req.query(queryParameters);
      }
      if (params.body) { req.send(params.body); }

      req.end((error: any, response: any) => {
        if (error || !response.ok) {
          if (response && response.body) {
            const customError: any = new Error(response.body.message);
            customError.status = response.body.status;
            customError.type = response.body.type;
            reject(customError);
            return;
          }

          reject(error);
        } else {
          resolve(response.body);
        }
      });
    });
  }
}

export namespace TestClient {
  let baseApiUrl: string;

  export const Initialize = (params: { host: string; }) => {
    baseApiUrl = `https://${params.host}`;
  };

  /**
   * Namespace representing REST API for ERC dEX
   */
  export namespace Api {

    export interface Order {
      id?: string;
      petId?: string;
      quantity?: number;
      shipDate?: Date;
      /**
       * Order Status
       */
      status?: string;
      complete?: boolean;
    }

    export interface User {
      id?: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      phone?: string;
      /**
       * User Status
       */
      userStatus?: number;
    }

    export interface Category {
      id?: string;
      name?: string;
    }

    export interface Tag {
      id?: string;
      name?: string;
    }

    export interface Pet {
      id?: string;
      category?: Category;
      name: string;
      photoUrls: any[];
      tags?: Tag[];
      /**
       * pet status in the store
       */
      status?: string;
    }

    export interface ApiResponse {
      code?: number;
      type?: string;
      message?: string;
    }


    export interface IpetAddPetParams {
      /**
       * Pet object that needs to be added to the store
       */
      body: Pet;
    }

    export interface IpetUpdatePetParams {
      /**
       * Pet object that needs to be added to the store
       */
      body: Pet;
    }

    export interface IpetFindPetsByStatusParams {
      /**
       * Status values that need to be considered for filter
       */
      status: any;
    }

    export interface IpetFindPetsByTagsParams {
      /**
       * Tags to filter by
       */
      tags: any;
    }

    export interface IpetGetPetByIdParams {
      /**
       * ID of pet to return
       */
      petId: number;
    }

    export interface IpetUpdatePetWithFormParams {
      /**
       * ID of pet that needs to be updated
       */
      petId: number;
      /**
       * Updated name of the pet
       */
      name?: string;
      /**
       * Updated status of the pet
       */
      status?: string;
    }

    export interface IpetDeletePetParams {
      api_key?: string;
      /**
       * Pet id to delete
       */
      petId: number;
    }

    export interface IpetUploadFileParams {
      /**
       * ID of pet to update
       */
      petId: number;
      /**
       * Additional data to pass to server
       */
      additionalMetadata?: string;
      /**
       * file to upload
       */
      file?: any;
    }

    export interface IstorePlaceOrderParams {
      /**
       * order placed for purchasing the pet
       */
      body: Order;
    }

    export interface IstoreGetOrderByIdParams {
      /**
       * ID of pet that needs to be fetched
       */
      orderId: number;
    }

    export interface IstoreDeleteOrderParams {
      /**
       * ID of the order that needs to be deleted
       */
      orderId: number;
    }

    export interface IuserCreateUserParams {
      /**
       * Created user object
       */
      body: User;
    }

    export interface IuserCreateUsersWithArrayInputParams {
      /**
       * List of user object
       */
      body: User[];
    }

    export interface IuserCreateUsersWithListInputParams {
      /**
       * List of user object
       */
      body: User[];
    }

    export interface IuserLoginUserParams {
      /**
       * The user name for login
       */
      username: string;
      /**
       * The password for login in clear text
       */
      password: string;
    }

    export interface IuserGetUserByNameParams {
      /**
       * The name that needs to be fetched. Use user1 for testing. 
       */
      username: string;
    }

    export interface IuserUpdateUserParams {
      /**
       * name that need to be updated
       */
      username: string;
      /**
       * Updated user object
       */
      body: User;
    }

    export interface IuserDeleteUserParams {
      /**
       * The name that needs to be deleted
       */
      username: string;
    }
    export class petService extends ApiService {

      public async addPet(_params: IpetAddPetParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/pet`
        };

        requestParams.body = _params.body;
        return this.executeRequest<void>(requestParams);
      }

      public async updatePet(_params: IpetUpdatePetParams) {
        const requestParams: IRequestParams = {
          method: 'PUT',
          url: `${baseApiUrl}/v2/pet`
        };

        requestParams.body = _params.body;
        return this.executeRequest<void>(requestParams);
      }

      /**
       * Multiple status values can be provided with comma separated strings
       */
      public async findPetsByStatus(_params: IpetFindPetsByStatusParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/pet/findByStatus`
        };

        requestParams.queryParameters = {
          status: _params.status,
        };
        return this.executeRequest<Pet[]>(requestParams);
      }

      /**
       * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
       */
      public async findPetsByTags(_params: IpetFindPetsByTagsParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/pet/findByTags`
        };

        requestParams.queryParameters = {
          tags: _params.tags,
        };
        return this.executeRequest<Pet[]>(requestParams);
      }

      /**
       * Returns a single pet
       */
      public async getPetById(_params: IpetGetPetByIdParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/pet/${_params.petId}`
        };
        return this.executeRequest<Pet>(requestParams);
      }

      public async updatePetWithForm(_params: IpetUpdatePetWithFormParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/pet/${_params.petId}`
        };
        return this.executeRequest<void>(requestParams);
      }

      public async deletePet(_params: IpetDeletePetParams) {
        const requestParams: IRequestParams = {
          method: 'DELETE',
          url: `${baseApiUrl}/v2/pet/${_params.petId}`
        };
        return this.executeRequest<void>(requestParams);
      }

      public async uploadFile(_params: IpetUploadFileParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/pet/${_params.petId}/uploadImage`
        };
        return this.executeRequest<ApiResponse>(requestParams);
      }
    }
    export class storeService extends ApiService {

      /**
       * Returns a map of status codes to quantities
       */
      public async getInventory() {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/store/inventory`
        };
        return this.executeRequest<any>(requestParams);
      }

      public async placeOrder(_params: IstorePlaceOrderParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/store/order`
        };

        requestParams.body = _params.body;
        return this.executeRequest<Order>(requestParams);
      }

      /**
       * For valid response try integer IDs with value &gt;&#x3D; 1 and &lt;&#x3D; 10. Other values will generated exceptions
       */
      public async getOrderById(_params: IstoreGetOrderByIdParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/store/order/${_params.orderId}`
        };
        return this.executeRequest<Order>(requestParams);
      }

      /**
       * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
       */
      public async deleteOrder(_params: IstoreDeleteOrderParams) {
        const requestParams: IRequestParams = {
          method: 'DELETE',
          url: `${baseApiUrl}/v2/store/order/${_params.orderId}`
        };
        return this.executeRequest<void>(requestParams);
      }
    }
    export class userService extends ApiService {

      /**
       * This can only be done by the logged in user.
       */
      public async createUser(_params: IuserCreateUserParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/user`
        };

        requestParams.body = _params.body;
        return this.executeRequest<void>(requestParams);
      }

      public async createUsersWithArrayInput(_params: IuserCreateUsersWithArrayInputParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/user/createWithArray`
        };

        requestParams.body = _params.body;
        return this.executeRequest<void>(requestParams);
      }

      public async createUsersWithListInput(_params: IuserCreateUsersWithListInputParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseApiUrl}/v2/user/createWithList`
        };

        requestParams.body = _params.body;
        return this.executeRequest<void>(requestParams);
      }

      public async loginUser(_params: IuserLoginUserParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/user/login`
        };

        requestParams.queryParameters = {
          username: _params.username,
          password: _params.password,
        };
        return this.executeRequest<string>(requestParams);
      }

      public async logoutUser() {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/user/logout`
        };
        return this.executeRequest<void>(requestParams);
      }

      public async getUserByName(_params: IuserGetUserByNameParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseApiUrl}/v2/user/${_params.username}`
        };
        return this.executeRequest<User>(requestParams);
      }

      /**
       * This can only be done by the logged in user.
       */
      public async updateUser(_params: IuserUpdateUserParams) {
        const requestParams: IRequestParams = {
          method: 'PUT',
          url: `${baseApiUrl}/v2/user/${_params.username}`
        };

        requestParams.body = _params.body;
        return this.executeRequest<void>(requestParams);
      }

      /**
       * This can only be done by the logged in user.
       */
      public async deleteUser(_params: IuserDeleteUserParams) {
        const requestParams: IRequestParams = {
          method: 'DELETE',
          url: `${baseApiUrl}/v2/user/${_params.username}`
        };
        return this.executeRequest<void>(requestParams);
      }
    }
  }
}