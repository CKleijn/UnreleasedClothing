import neo4j from 'neo4j-driver';
import { Inject, Injectable } from '@nestjs/common';
import { Driver, Result } from 'neo4j-driver-core';
import { Neo4jConfig } from './neo4j-config.interface';

@Injectable()
export class Neo4jService {
    constructor(@Inject('NEO4J_CONFIG') private config: Neo4jConfig, @Inject('NEO4J_DRIVER') private driver: Driver) {}

    async getDriver(): Promise<Driver> {
        return this.driver;
    }

    async getConfig(): Promise<Neo4jConfig> {
        return this.config;
    }

    async getReadSession(database?: string) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.READ,
        })
    }

    async getWriteSession(database?: string) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.WRITE,
        })
    }

    async read(cypher: string, params: Record<string, any>, database?: string): Promise<Result> {
        const session = await this.getReadSession(database);
        return await session.run(cypher, params);
    }

    async write(cypher: string, params: Record<string, any>, database?: string): Promise<Result> {
        const session = await this.getWriteSession(database);
        return await session.run(cypher, params);
    }
}