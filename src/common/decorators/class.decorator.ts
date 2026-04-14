import { Injectable, SetMetadata } from '@nestjs/common';

export const DAO_KEY = 'dao';

export function Dao(): ClassDecorator {
  return (target) => {
    Injectable()(target);
    SetMetadata(DAO_KEY, true)(target);
  };
}
