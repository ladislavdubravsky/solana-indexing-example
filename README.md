# Indexing Solana - an example

## Prerequisites

We use [firehose](https://thegraph.com/docs/en/firehose/) as the core tool to index chain data and [substreams](https://thegraph.com/docs/en/substreams/) to define which data to collect, how to transform them and make them available for consumption.

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

```firecore -c ./substreams/firehose-solana.yaml start```

4. Download and run the solana-explorer substream, which exposes a parametrized module to fetch instructions executed by a certain program (we paste the `program_id` as the final argument).

```
substreams run -e localhost:9000 --plaintext \
    https://spkg.io/streamingfast/solana-explorer-v0.2.0.spkg \
    map_filter_instructions \
    -p map_filter_instructions=program_id=2En6xhri6FxEG6d47mhuXZYyEaqa2nr4pnwjfjpWdDkE
```

5. Create an `.env` file based on `.env.example` and adjust your `ANCHOR_WALLET` path. Now you can call the test program in a transaction:

```npx ts-node scripts/call-program.ts```

And then observe the substream picking up on the resulting instruction!

## Next steps:

* building custom substreams, in particular if we find we need specific processing not available in the existing solana packages in the substreams packages registry
* trying out a SQL db sink instead of just logging to console