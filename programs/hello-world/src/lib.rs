use anchor_lang::prelude::*;

declare_id!("2En6xhri6FxEG6d47mhuXZYyEaqa2nr4pnwjfjpWdDkE");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
