# Indexing Solana - an example

## Prerequisites

We will use [firehose](https://thegraph.com/docs/en/firehose/) as the core tool to index chain data and [substreams](https://thegraph.com/docs/en/substreams/) to define which data to collect, how to transform them and make them available for consumption.

You'll need to make the following globally available:

* [firehose core](https://github.com/streamingfast/firehose-core/releases)
* [firehose for solana](https://github.com/streamingfast/firehose-solana/releases)
* [substreams cli](https://substreams.streamingfast.io/documentation/consume/installing-the-cli)
* [solana cli](https://docs.solanalabs.com/cli/install)

## Running the test setup

1. Run Solana test validator:

```solana-test-validator --reset```

Make sure you have a default funded account (e.g. `solana balance --url localhost $(solana-keygen pubkey)`). If not, airdrop. See [docs](https://solana.com/developers/guides/getstarted/solana-test-validator) for interacting with the test validator.

2. Deploy our simple program:

```anchor deploy```

3. Run firehose-core stack to index the test validator:

```firecore -c ./substreams-devenv/firehose-solana.yaml start```

4. Run the sink substream package, which doesn't do any processing on the blocks and just logs them instead of storing them or consuming some other them way:

```substreams run -e localhost:9000 --plaintext https://github.com/streamingfast/substreams-sink-noop/raw/develop/substreams-head-tracker/substreams-head-tracker-v1.0.0.spkg -s 1 map_blocks```

5. Create `.env` file based on `.env.example` and adjust your `ANCHOR_WALLET` path. Now you can call the test program in a transaction:

```npx ts-node scripts/call-program.ts```