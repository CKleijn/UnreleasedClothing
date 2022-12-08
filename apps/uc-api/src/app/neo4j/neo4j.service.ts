import neo4j from 'neo4j-driver';
import { Inject, Injectable } from '@nestjs/common';
import { Driver, Result } from 'neo4j-driver-core';
import { Neo4jConfig } from './neo4j-config.interface';

@Injectable()
export class Neo4jService {
    constructor(@Inject('NEO4J_CONFIG') private config: Neo4jConfig, @Inject('NEO4J_DRIVER') private driver: Driver) {}

    getDriver(): Driver {
        return this.driver;
    }

    getConfig(): Neo4jConfig {
        return this.config;
    }

    getReadSession(database?: string) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.READ,
        })
    }

    getWriteSession(database?: string) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.WRITE,
        })
    }

    read(cypher: string, params: Record<string, any>, database?: string): Result {
        const session = this.getReadSession(database);
        return session.run(cypher, params);
    }

    write(cypher: string, params: Record<string, any>, database?: string): Result {
        const session = this.getWriteSession(database);
        return session.run(cypher, params);
    }
}
