export interface ICredit {
  cast: ICast[];
  crew: ICrew[];
}

export interface ICreditBackend {
  _id: string;
  cast: [];
  crew: [];
  id: number;
}

export interface ICast {
  castId: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profilePath: string;
}

export interface ICrew {
  credit_id: string;
  department: string;
  gender: number;
  job: string;
  name: string;
  profilePath: string;
}
