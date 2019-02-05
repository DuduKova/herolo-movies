import { MovieGuard} from './movies.guard';
import { MovieExistsGuard} from './movie-exists.guard';

export const guards: any[] = [MovieGuard, MovieExistsGuard];

export * from './movies.guard';
export * from './movie-exists.guard';
